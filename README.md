# 后台管理项目

React + TypeScript + Vite

## redux

<https://redux.js.org/faq>-常见问题集锦

### Redux 背后的基本思想

在应用程序中包含全局状态的单个集中位置，以及更新该状态以使代码可预测时要遵循的特定模式。

### 什么是redux

Redux 是一种使用称为“操作”的事件来管理和更新应用程序状态的模式和库。它充当需要在整个应用程序中使用的状态的集中存储，并通过规则确保状态只能以可预测的方式更新。

### 为什么需要redux

当我们有多个需要共享和使用相同状态的组件时，特别是当这些组件位于应用程序的不同部分时，这种简单性可能会被破坏。有时，这可以通过“提升状态”到父组件来解决，但这并不总是有帮助。

解决此问题的一种方法是从组件中提取共享状态，并将其放入组件树外部的集中位置。这样，我们的组件树就变成了一个大“视图”，任何组件都可以访问状态或触发操作，无论它们位于树中的哪个位置

### 为什么不要在Redux中改变状态有几个原因

 Redux 期望所有状态更新都是不可变地完成的。

1.它会导致错误，例如 UI 无法正确更新以显示最新值
2.这使得理解状态更新的原因和方式变得更加困难
3.这使得编写测试变得更加困难
4.它破坏了正确使用“时间旅行调试”的能力
5.它违背了 Redux 的预期精神和使用模式

### 具体如何存储

Redux 存储是使用configureStoreRedux Toolkit 中的函数创建的。 configureStore要求我们传入一个reducer参数。

### 切片

slice:“切片”是应用程序中单个功能的 Redux reducer逻辑和action的集合，通常在单个文件中一起定义。这个名字来源于将根 Redux 状态对象分割成多个状态“切片”。

createSlice:负责生成action类型字符串、actions创建器函数和action对象的工作。

譬如counterSlice.js中：
   "counter"名字和"increment"reducer函数生成一个action对象 {type: "counter/increment"}

### reducers

reducers永远不允许改变原始/当前状态值！
reducers只能复制原始值，然后可以对副本进行变异。
手动编写不可变的更新逻辑很困难，并且意外改变reducers中的状态是 Redux 用户最常犯的错误。

这就是为什么 Redux Toolkit 的createSlice功能可以让您以更简单的方式编写不可变更新！

### 为什么 Redux Toolkit 的createSlice功能可以让您以更简单的方式编写不可变更新？

Toolkit有一个库，Immer。用proxy代理数据，允许改变值，但是Immer会跟踪所有的更改，然后使用一个安全的更新列表返回一个安全的不可变的更新值。

就好像手动编写了所有不可变的更新逻辑一样。

### 异步逻辑

Redux 有多种异步中间件，每种都允许您使用不同的语法编写逻辑。
最常见的异步中间件是redux-thunk，它允许您编写可能直接包含异步逻辑的普通函数。
Redux Toolkit 的configureStore功能默认自动设置 thunk 中间件，我们建议使用 thunk 作为使用 Redux 编写异步逻辑的标准方法。

#### thunk

thunk是一种特定类型的 Redux 函数，可以包含异步逻辑。thunk 是使用两个函数编写的：

1.内部 thunk 函数，获取dispatch和getState作为参数
2.外部创建者函数，创建并返回 thunk 函数

下面的函数称为 thunk，允许我们执行异步逻辑。它可以像常规操作一样进行调度：`dispatch(incrementAsync(10))`，这将调用以 `dispatch` 函数作为第一个参数的 thunk。然后可以执行异步代码并分派其他操作

```JS
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
```

注意：使用 thunk 需要在创建 Redux 存储时将redux-thunk 中间件（一种 Redux 插件）添加到 Redux 存储中。幸运的是，Redux Toolkit 的configureStore函数已经自动为我们设置好了

### 钩子

#### useSelector

useSelector：让我们的组件从 Redux 存储状态中提取所需的任何数据
每当一个操作被调度并且 Redux 存储被更新时，useSelector都会重新运行我们的选择器函数。如果选择器返回的值与上次不同，useSelector将确保我们的组件使用新值重新渲染。

#### useDispatch

dispatch分派操作

```js
store.dispatch(increment())
```

### 是否总是必须将所有应用程序的状态放入 Redux 存储中？

应用程序所需的全局状态应该放在 Redux 存储中。仅在组件中需要的状态应保留在组件状态中。

如果您不确定将某些内容放在哪里，可以使用以下一些常见的经验规则来确定应将哪种数据放入 Redux 中：

1.应用程序的其他部分是否关心这些数据？
2.您是否需要能够基于此原始数据创建进一步的派生数据？
3.是否使用相同的数据来驱动多个组件？
4.能够将此状态恢复到给定时间点（即时间旅行调试）对您有价值吗？
5.您是否想要缓存数据（即，如果状态已经存在，则使用状态而不是重新请求它）？
6.您是否希望在热重载 UI 组件时保持这些数据一致（交换时可能会丢失其内部状态）？
