
### Apitect

![image](https://user-images.githubusercontent.com/160805/197213640-f05683e4-9bf7-4640-933b-fc228a13f411.png)

Apitect is a hobby project of mine, that I work on occasionally. It's gonna be basically a glorified json editor with different lenses on different value types.
However, unlike json it will also support binary data storage and external sources that work as data providers for array nodes. Each document has different _tags_, so one can use them to have, for example, different json configs for different environments or multiple languages of the same locale document.

Each object-typed json node exposes a REST endpoint which can be accessed via CRUD. 
Document validation and versioning with publish option will be baked into the core.

Please note, this is no-where ready yet, but I like to work on it here and then. Feel free to explore the source code.

# Run the project

- in /server:
  - `docker-compose up`
  - `npm run start`
- in /frontend:
  - `npm run start`

# Features

- download as via rest api: content-type: Json, Typescript, Swagger config, capitalize/camelcase-keys
+ values can have user ownership or tag
+ tags can extend each other
+ all values are inline editable
- Login endpoint for user collections -> returns jwt
- Tags are sent as http headers
- CRUD endpoints
- Array needs ID field for CRUD operations
- Value column head has extends/copy dropdown
- publish only possible when doc is valid, otherwise API gives 404
- date restrictions only future/past etc?
- Value type for event like value with repetition (cron)?

# Todo

- password input masked + view eye
- unify selectedvaluenode and selectednode
- ReferenceInput (gets a list of inputs (ref, rest, db) + ramda code -> final value)
- ColorInput
- RichtextInput
+ SelectInput
+ MultiTagInput
+ ListInput
- ArrayInput (values have ArrayItemId reference)
+ DateInput
- TreeInput: ~arrow keys~, remember open state, open selected
- toasts for validation errors in dashboard
+ element for editing existing, new and delete form items
- App-wide keyboard shortcuts for navi dropdown 
+ find out why EnumsSettings restores name after deleting it from text input
- search for tree selector

## nice to have?

- put values to project dependent collections
- TimeInput

# Type expansion

- Color
  ```typescript
  export default {
    red: number,
    green: number,
    blue: number,
    alpha: number
  }
  ```

- Location
  ```typescript
  export default {
    longitude: number,
    latitude: number
  }
  ``` 

- Binary
  ```typescript
  export default {
    contentType: string,
    length: number,
    base64: string
  }
  ```   
  
- Reference
  ```typescript
  export default {
    path: Array<string>
  }
  ```   

- String
  ```typescript
  export default string | '***'
  ```   

- Date
  ```typescript
  export default {
    date: string,
    timeZone: string
  }
  ```   

- Richtext
  ```typescript
  export default {
    html: string
  }
  ```   

## Ideas

- integrate https://github.com/quicktype/quicktype
