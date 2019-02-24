# react-json-tree-viewer

[![Build Status](https://travis-ci.org/Hokkaidosunny/react-json-tree-viewer.svg?branch=master)](https://travis-ci.org/Hokkaidosunny/react-json-tree-viewer)

react-json-tree-viewer

# Usage

```javascript
import Rjv from 'react-json-tree-viewer'

const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar'
  }
}

<Rjv data={json} />
```

# Result

<img src='.github/screenshot.jpg' width='200px'>

# Props
| Name             | Type                                        | Default | Description                               |
| :--------------- | :------------------------------------------ | :------ | :---------------------------------------- |
| data             | object/array                                | {}      | json data                                 |
| hideRoot         | boolean                                     | false   | if show root                              |
| shouldExpandNode | (path: string[], data: any) => boolean      | null    | if expand object or array in first render |
| onArrowClick     | (path: string[], expanded: boolean) => void | null    | hanle arrow click                         |
| labelRenderer    | (keyName: string) => JSX.Element            | null    | custom render label                       |
| valueRenderer    | (data: any) => JSX.Element                  | null    | custom render value                       |
| typeRenderer     | (data: any) => JSX.Element                  | null    | custom type laber                         |
| arrowStyle       | React css Properties                        | null    | custom arrow style                        |




