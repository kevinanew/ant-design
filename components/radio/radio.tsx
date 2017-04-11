import React, { PropTypes } from 'react';
import RcRadio from 'rc-radio';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import RadioGroup from './group';
import RadioButton from './radioButton';

export interface RadioProps extends AbstractCheckboxProps {
  value?: any;
}

export default class Radio extends React.Component<RadioProps, any> {
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const {
      prefixCls,
      className,
      children,
      style,
      ...restProps,
     } = this.props;
    let radioProps: RadioProps = { ...restProps };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <RcRadio
          {...radioProps}
          prefixCls={prefixCls}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
