const en = {
  app: {
    name: '{ api/tect }',
    login: 'Login',
    logout: 'Logout',
    tagSettings: 'Tag settings',
    download: 'Download',
    publish: 'Publish',
    tags: 'Tags',
    validation: 'Validation issues',
    search: {
      global: 'Search...',
      array: 'Search {{ array }}...'
    },
    importJson: 'Import json',
    apiKeys: 'API keys',
    projectUsers: 'Project users',
    enumerations: 'Enumerations',
    profile: 'Profile',
    arrayPanel: {
      newItem: 'Create a new item',
      deleteItem: 'Delete item',
      copyItem: 'Copy item',
      selectAll: 'Select all'
    }
  },
  common: {
    error: 'Error',
    success: 'Success',
    close: 'Close',
    cancel: 'Cancel',
    back: 'Back',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    select: 'Select...',
    yesImSure: 'I am sure!',
    unexpectedError: 'Oops! An unexpected error',
    confirmation: 'Confirmation required',
    questions: {
      delete: 'Are you sure you want to delete this node? This action is irreversible.'
    }
  },
  modals: {
    newNode: {
      title: 'Create new node',
      submit: 'Create'
    },
    forgotPassword: {
      title: 'Forgot password?',
      info: 'If you have forgotten your password, please fill in your email and click the "send" button.',
      submit: 'Email me a reset link',
      success: 'We have sent you an email with further instruction on how to reset your password.'
    },
    authenticate: {
      title: 'Authentication',
      login: {
        title: 'Login',
        submit: 'Login',
        forgotPassword: 'Forgot password?'
      },
      register: {
        title: 'Register',
        submit: 'Register',
        success:
          'You have successfully registered to Apitect!<br/>' +
          'We have sent you a confirmation email with a login link inside.'
      }
    },
    nodeSettings: {
      title: 'Settings: {{ property }}',
      validation: 'Validation',
      appearance: 'Appearance',
      required: 'Required',
      string: {
        none: 'No validation',
        regexp: 'Regular expression',
        email: 'Email',
        password: 'Password (values will be encrypted)'
      },
      object: {
        apiEndpoint: 'Accessible via REST api'
      },
      date: {
        localized: 'Localized',
        custom: 'Custom format',
        humanReadable: 'Human readable'
      },
      number: {
        min: 'Minimum',
        max: 'Maximum',
        step: 'Step',
        unit: 'Unit',
        precision: 'Precision'
      },
      enums: {
        enumeration: 'Enumeration'
      },
      array: {
        dataSource: 'Data source',
        internal: {
          title: 'Internal'
        },
        database: {
          title: 'External database',
          testConnection: 'Test connection'
        }
      }
    },
    projectUserSettings: {
      title: 'Project users',
      info: 'Make sure email and password field belong to the same array-typed parent!',
      errors: {
        invalidParent:
          'Email and Password field must be descendants of the same array-typed parent node',
        invalidNodes: 'Invalid node type selected',
        emailType: 'Email field must be of type string with email constraint',
        passwordType: 'Password field must be of type string with password constraint'
      }
    },
    tagsSettings: {
      title: 'Tags',
      info: 'Tags represent copies of your project data. Furthermore tags can extend each other so that missing values can be resolved by looking up parent tags.'
    },
    enumsSettings: {
      title: 'Enumerations',
      info: 'Enumerations represent sets of labels which can be used in nodes of the type Enum',
      enumName: 'Name',
      values: 'Values',
      newEnum: 'Add a new enumeration',
      missingName: 'Name missing'
    },
    tagSettings: {
      title: 'Tag {{ name }}'
    },
    userSettings: {
      title: 'User settings',
      visibleTags: 'Visible tags'
    }
  },
  form: {
    fields: {
      name: 'Name',
      nodeName: 'Name',
      nodeType: 'Type',
      email: 'E-Mail',
      emailId: 'E-Mail node',
      tags: 'Tags',
      passwordId: 'Password node',
      password: 'Password',
      passwordRepeat: 'Repeat password',
      rememberMe: 'Remember me',
      submit: 'Login',
      regexp: 'Regular Expression',
      number: 'Number',
      search: 'Search',
      parentTag: 'Extends from',
      format: 'Custom format',
      enumeration: 'Enumeration',
      displayNode: 'Display node',
      displayColumn: 'Display column',
      dbUrl: 'Connection url',
      dbUser: 'Database user',
      dbPassword: 'Database password',
      query: 'Query',
      parent: 'Parent tag'
    },
    validation: {
      regexp: '$t(form.fields.{{ field }}) has invalid format',
      validRegExp: '$t(form.fields.{{ field }}) is not a valid regular expression',
      validEmail: '$t(form.fields.{{ field }}) is not valid',
      required: '$t(form.fields.{{ field }}) is required',
      noSpecialCharactersOrSpace:
        "$t(form.fields.{{ field }}) mustn't contain special characters or spaces",
      noSpecialCharacters: "$t(form.fields.{{ field }}) mustn't contain special characters",
      password:
        '$t(form.fields.{{ field }}) must be at least 6 characters long, 1 digit and 1 uppercase letter',
      dateformat:
        '$t(form.fields.{{ field }}) must be a correct <a href="https://date-fns.org/v2.27.0/docs/format" target="_blank" class="link-primary text-decoration-none">date-format</a',
      mustChoose: 'You must select one of the options.',
      uniqueElements: 'Elements must be unique',
      notEmpty: 'At least one item is required'
    },
    dropDown: {
      noValue: 'Select...'
    }
  },
  validation: {
    server: {
      userExists: 'User already exists',
      userNotFound: 'User not found',
      passwordWrong: 'Wrong password',
      passwordMustMatch: "Password doesn't match",
      invalidId: 'ID must be a valid UUID'
    },
    failed: 'Validation failed',
    createItemInfo: 'Make sure all fields for the current array node are valid.'
  },
  tooltips: {
    import: 'Import',
    deleteNode: 'Delete selected node',
    createNode: 'Create a new node',
    nodeSettings: 'Node settings',
    tags: 'Select tags'
  }
}

export default en
