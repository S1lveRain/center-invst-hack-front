
interface RegStepI{
    name: string,
    placeholder: string,
    type: string,
  }

 const steps = [
    {
      title: 'Регистрация',
    },
    {
      title: 'Личные данные',
    },
    {
      title: 'Образование',
    },
  ];
const phoneRegExp = /((8|\+7)-?)?\(?\d{3}\)?-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}/
const firstStepFields: RegStepI[] = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'email',
    },
    {
     type: 'password',
     name: 'password',
     placeholder: 'пароль',
    },

  ]
  const secondStepFields: RegStepI[] = [
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'ваше имя'
    },
    {
      name: 'patronymic',
      type: 'text',
      placeholder: 'ваше отчество'
    },
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'ваша фамилия'
    },
    {
      name: 'age',
      type: 'number',
      placeholder: 'ваш возраст'
    },
    {
      type: 'text',
      name: 'phoneNumber',
      placeholder: 'ваш номер телефона',
    },
  ]
  const thirdStepFields: RegStepI[] = [

    {
      type: 'text',
      name: 'locality',
      placeholder: 'наименование вашего населённого пункта'
    },
    {
      name: 'schoolName',
      placeholder: 'наименование школы',
      type: 'text',
    },
    {
      name: 'schoolClass',
      placeholder: 'класс',
      type: 'number',
    },
   
  ]

  export {firstStepFields, secondStepFields, thirdStepFields, steps, phoneRegExp};