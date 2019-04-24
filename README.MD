Generate three redux files from CLI: "constants.js, actions.js, reducers.js"

Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run `base` (alias `b`) command. Next CLI will ask you to write your constants.
```
rs base 

# alias 
rs b
```
[Result example](https://github.com/shapkarin/redux-scaffolder/tree/master/example)

Note: yours input consts will be transformed to uppercase

Options for `base` command:
- `-r (--read)` to read consts from "constants.js" file
```
rs b -r
```
___

Otherwise you can generate "constants.js" with `consts` command (alias `c`):
```
rs consts
```

Options for `consts` command:
- `-p (--path)` to specify path/ACTION_TYPE

Then you can generate actions and reducers.
Tool will read constants from "constants.js" file.

To create actions.js use `actions` (alias `a`) command:
```
rs actions
```

To generate reducers.js there is `reducer [name]` (alias `r`) command:
```
rs reducer REDUCER_NAME
```

Or leave name blank:
```
rs r
```

