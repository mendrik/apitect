### Apitect

# Run the project

- in /server:
  - `docker-compose up`
  - `npm run start`
- in /frontend:
  - `npm run start`

# Features

- Download as Json, Typescript Types
- Values can have user ownership or tag
- Tags can extend each other
- All values are inline editable
- Mass editing on object nodes for single line editors
- Login endpoint for user collections -> returns jwt
- Tags are sent as http headers
- CRUD endpoints
- Array needs ID field for CRUD operations
- Value column head has extends/copy dropdown

# Todo

- TimeInput
- ReferenceInput
- ColorInput
- RichtextInput
- SelectInput
- MultiTagInput
- ListInput
- TreeInput: arrow keys, remember open state, open selected
- wait for user loading state missing

# Type expansion

- Color
  ```typescript
  export default {
    red: number,
    green: number,
    blue: number,
    alpha: number,
    hex: string,
    alphaHex: string
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
    path: string[]
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
