
interface RegStepI{
    name: string,
    placeholder: string,
    type: string,
  }

 const steps = [
    {
      title: 'Контакты',
    },
    {
      title: 'Персональные данные',
    },
    {
      title: 'Образование',
    },
  ];

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
    }
  ]
  const thirdStepFields: RegStepI[] = [
    {
      type: 'text',
      name: 'phoneNumber',
      placeholder: 'ваш номер телефона',
    },
    {
      type: 'text',
      name: 'city',
      placeholder: 'наименование вашего населённого пункта'
    },
    {
      name: 'schoolName',
      placeholder: 'наименование школы',
      type: 'text',
    },
    {
      name: 'classNumber',
      placeholder: 'класс',
      type: 'number',
    },
   
  ]

  export {firstStepFields, secondStepFields, thirdStepFields, steps};