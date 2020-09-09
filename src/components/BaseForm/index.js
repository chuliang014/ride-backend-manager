import React from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from '../../util/utils';


const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = () => {
        this.props.form.resetFields();
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == 'OrderTime') {
                    const begin_time = <FormItem label="Order Time" key={field}>
                        {
                            // 中括号可以把他当成变量的形式来对待
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            // 中括号可以把他当成变量的形式来对待
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time);
                } else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            // 中括号可以把他当成变量的形式来对待
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            }
                            )(
                                <Input type="text" placeholder={placeholder}>

                                </Input>
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            // 中括号可以帮他当成变量的形式来对待
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            }
                            )(
                                <Select
                                    placeholder={placeholder}
                                    style={{ width: width }}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            // 中括号可以帮他当成变量的形式来对待
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue
                            }
                            )(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }
            });
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                {/* Button */}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>Search</Button>
                    <Button onClick={this.reset}>Reset</Button>

                </FormItem>
            </Form>
        );
    }
}
export default FilterForm = Form.create({})(FilterForm);