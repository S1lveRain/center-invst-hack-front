import React, {useState} from 'react';
import {Card, DatePicker, Form, Input, Select, Tooltip} from 'antd';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import moment from "moment";
import dayjs from "dayjs";

const {Option} = Select;

const disabledDate = (current: any) => {
    const minimumAge = moment().subtract(18, 'year');
    return current && current.isBefore(minimumAge, 'day');
};

const genderOptions = [
    {value: 'male', label: 'Мужской'},
    {value: 'female', label: 'Женский'},
    {value: 'other', label: 'Другой'},
];

const maritalStatusOptions = [
    {value: 'single', label: 'Не женат/Не замужем'},
    {value: 'married', label: 'Женат/Замужем'},
    {value: 'divorced', label: 'Разведен(а)'},
    {value: 'widowed', label: 'Вдовец/Вдова'},
];

const validatePhone = (phone: string) => {
    const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
};

const formatPhone = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return phone;
};

export const ApplicationForm: React.FC = () => {
    const [value, setValue] = useState<dayjs.Dayjs | undefined>(undefined);
    const [phoneError, setPhoneError] = useState(false);
    const [phone, setPhone] = useState('');

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    const defaultPickerValue = dayjs(minDate);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPhone(value);
        setPhoneError(false);
    };

    const handlePhoneBlur = () => {
        const formattedPhone = formatPhone(phone);
        if (phone && !validatePhone(formattedPhone)) {
            setPhoneError(true);
        }
        setPhone(formattedPhone);
    };


    return (
        <div>
            <Card title="Заявка">
                <Card style={{marginTop: 16}} type="inner" title={<span style={{color: 'green'}}>Личные данные</span>}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        flexWrap: 'wrap'
                    }}>
                        {['Имя', 'Фамилия', 'Отчество'].map((label) => (
                            <Input
                                key={label}
                                style={{margin: '10px 10px', width: '30%'}}
                                placeholder={label}
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                suffix={
                                    <Tooltip title="Укажите как в паспорте">
                                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                    </Tooltip>
                                }
                            />
                        ))}
                        <DatePicker
                            style={{margin: '10px 10px', width: '30%'}}
                            value={value}
                            placeholder="Выберите дату рождения"
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            picker="date"
                            onChange={(newValue: any) => setValue(newValue)}
                            defaultPickerValue={defaultPickerValue}
                        />
                        <Select
                            style={{margin: '10px 10px', width: '30%'}}
                            placeholder="Выберите пол"
                        >
                            {genderOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            style={{margin: '10px 10px', width: '30%'}}
                            placeholder="Выберите семейное положение"
                        >
                            {maritalStatusOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <Form.Item
                            style={{margin: '10px 10px', width: '30%'}}
                            validateStatus={phoneError ? 'error' : undefined}
                            help={phoneError ? 'Неверный формат телефона' : undefined}
                        >
                            <Input
                                placeholder="+7 (___) ___-__-__"
                                value={phone}
                                onChange={handlePhoneChange}
                                onBlur={handlePhoneBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{margin: '10px 10px', width: '30%'}}
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Неверный формат E-mail',
                                },
                                {
                                    required: true,
                                    message: 'Введите ваш E-mail',
                                },
                            ]}
                        >
                            <Input
                                placeholder="E-mail"
                            />
                        </Form.Item>
                    </div>
                </Card>
            </Card>
        </div>
    );
};