import {
  composePaths,
  computeLabel,
  ControlElement,
  getFirstPrimitiveProp,
  isDescriptionHidden,
  JsonFormsSubStates,
  Resolve,
} from '@jsonforms/core';
import { RendererProps } from '@jsonforms/vue2';
import { useStyles } from '../styles';
import {
  computed,
  ComputedRef,
  inject,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from '../vue';
import Ajv from 'ajv';
import _ from 'lodash';
import { useControlAppliedOptions } from './appliedoptions';
import * as Controlbuilder from './controlbuilder';
import { reactive } from '@vue/composition-api';

const useComputedLabel = <I extends { control: any }>(
  input: I,
  appliedOptions: ComputedRef<any>
) => {
  return computed((): string => {
    return computeLabel(
      input.control.value.label,
      input.control.value.required,
      !!appliedOptions.value?.hideRequiredAsterisk
    );
  });
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVuetifyControl = <
  I extends { control: any; handleChange: any }
>(
  input: I,
  adaptValue: (target: any, options: any) => any = (v) => v
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const isFocused = ref(false);
  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, adaptValue(value, appliedOptions));
  };

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const computedLabel = useComputedLabel(input, appliedOptions);

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    persistentHint,
    computedLabel,
  };
};

export const useTranslator = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms couldn't be injected. Are you within JSON Forms?"
    );
  }

  if (!jsonforms.i18n || !jsonforms.i18n.translate) {
    throw new Error(
      "'jsonforms i18n couldn't be injected. Are you within JSON Forms?"
    );
  }

  const translate = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jsonforms.i18n!.translate!;
  });

  return translate;
};



/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useVuetifyArrayControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const computedLabel = useComputedLabel(input, appliedOptions);

  const childLabelForIndex = (index: number) => {
    const childLabelProp =
      input.control.value.uischema.options?.childLabelProp ??
      getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return `${index}`;
    }
    const labelValue = Resolve.data(
      input.control.value.data,
      composePaths(`${index}`, childLabelProp)
    );
    if (
      labelValue === undefined ||
      labelValue === null ||
      Number.isNaN(labelValue)
    ) {
      return '';
    }
    return `${labelValue}`;
  };
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    childLabelForIndex,
    computedLabel,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useVuetifyBasicControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
  };
};

/**
 * Extracts Ajv from JSON Forms
 */
export const useAjv = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms' couldn't be injected. Are you within JSON Forms?"
    );
  }

  // should always exist
  return jsonforms.core?.ajv as Ajv;
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVuetifyControlExt = <
  I extends { control: any; handleChange: any }
>(
  props: RendererProps<ControlElement> | any,
  input: I,
  adaptValue: (target: any) => any = (v) => v
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const controlBuilder = reactive({
    items: Controlbuilder.items(input.control.value.uischema),
    itemsBuilder: Controlbuilder.itemsBuilder(input.control.value.uischema),
    scope: Controlbuilder.pathControlSchema(input.control.value.uischema.scope),
    payload: {}
  });

  const isFocused = ref(false);
  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, adaptValue(value));
  };

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const computedLabel = useComputedLabel(input, appliedOptions);

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  // Extension for dependents fields
  const JForm = inject<any>('JForm');
  const store = inject<any>('store');
  const JReactivex = inject<any>('JReactivex');

  //Watch for execute onchange
  const unwatch = Controlbuilder.watchScope(store, props.uischema, {
    JForm,
    JReactivex
  });

  Controlbuilder.scopesHandler(props.uischema, {
    JReactivex,
    JForm
  },
    // Save new items 
    (narray: any) => {
      controlBuilder.items = narray;
    },
    //Save payload fom dependencies
    (payload: any) => {
      controlBuilder.payload = payload;
    }

  );

  onBeforeMount(() => { });
  onMounted(() => { });
  onBeforeUpdate(() => { });
  onUpdated(() => { });
  onBeforeUnmount(() => { });
  onUnmounted(() => {
    unwatch();
  });
  onActivated(() => { });
  onDeactivated(() => {
    unwatch();
  });
  onErrorCaptured(() => { });
  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    persistentHint,
    computedLabel,
    controlBuilder
  };
};
