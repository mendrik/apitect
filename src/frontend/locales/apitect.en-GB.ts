const en = {
  translation: {
    app: {
      name: 'Apitect',
      register: 'Register',
      login: 'Login'
    },
    modals: {
      authenticate: {
        login: {
          title: 'Login'
        }
      }
    },
    navbar: {
      login: 'Login'
    },
    form: {
      fields: {
        email: 'E-Mail',
        password: 'Password',
        rememberMe: 'Remember me',
        submit: 'Login'
      },
      validation: {
        validEmail: '$t(form.fields.{{ field }}) is not valid',
        required: '$t(form.fields.{{ field }}) is required'
      }
    },
    validation: {
      server: {
        userExists: 'User already exists',
        userNotFound: 'User not found',
        passwordWrong: 'Wrong password'
      }
    }
  }
}

export default en
