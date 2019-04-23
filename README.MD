Generate three redux files from CLI: "constants.js, actions.js, reducers.js"

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

___

Otherwise you can generate constants.js with `consts` command (alias `c`):
```
redux consts
```

Options for `consts` command:
- `-p (--path)` to specify path/ACTION_TYPE

Then you can generate actions and reducers.
Tool will read constants from previous step.

To create actions.js use `actions` (alias `a`) command:
```
redux actions
```

To generate reducers.js there is `reducer [name]` (alias `r`) command:
```
redux reducer REDUCER_NAME
```

Or leave name blank:
```
redux r
```

