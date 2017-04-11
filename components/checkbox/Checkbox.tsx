import React, { PropTypes } from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import CheckboxGroup from './Group';

export interface AbstractCheckboxProps {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: React.FormEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
}

export interface CheckboxProps extends AbstractCheckboxProps {
  indeterminate?: boolean;
  value?: any;
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static Group: typeof CheckboxGroup;

  static defaultProps = {
    prefixCls: 'ant-checkbox',
    indeterminate: false,
  };

  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  render() {
    const {
      prefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps,
    } = this.props;
    let checkboxProps: CheckboxProps = { ...restProps };
    if (this.context.checkboxGroup) {
      checkboxProps.onChange =
        () => this.context.checkboxGroup.toggleOption({ label: children, value: this.props.value });
      checkboxProps.checked = this.context.checkboxGroup.value.indexOf(this.props.value) > -1;
      checkboxProps.disabled = this.props.disabled || this.context.checkboxGroup.disabled;
    }
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
