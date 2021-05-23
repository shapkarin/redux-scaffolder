Generate three redux files from CLI: "constants.js, actions.js, reducers.js"

![npm](https://img.shields.io/npm/v/redux-scaffolder.svg)
![npm](https://img.shields.io/npm/dt/redux-scaffolder.svg)
![NPM](https://img.shields.io/npm/l/redux-scaffolder.svg)

### If you want to [say thank you](https://github.com/shapkarin/extend-saga-routines/blob/master/thanks.md).


Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run `base` (alias `b`) command. Next CLI will ask you to write your constants.
```
redux base 

# alias 
redux b
```
[Result example](https://github.com/shapkarin/redux-scaffolder/tree/master/example)

Note: yours input consts will be transformed to uppercase

Options for `base` command:
- `-r (--read)` to read consts from "constants.js" file
```
redux b -r
```
___

Otherwise you can generate "constants.js" with `consts` command (alias `c`):
```
redux c
```

Options for `consts` command:
- `-p (--path)` to specify path/ACTION_TYPE

Then you can generate actions and reducers.
Tool will read constants from "constants.js" file.

To create actions.js use `actions` (alias `a`) command:
```
redux a
```

To generate reducers.js there is `reducer [name]` (alias `r`) command:
```
redux r REDUCER_NAME

# or leave name blank
redux r
```

