# Vue 3 PopupLayer

用于创建一个可以弹出的弹窗层,组合式函数实现了弹窗的核心逻辑,包括打开/关闭、历史状态管理、z-index 自动获取等功能,提供了一个功能完备的弹窗解决方案

## 属性部分

- visible(boolear): 控制弹窗是否可见,布尔类型.
- animation(boolear): 控制是否启用动画效果,布尔类型.
- zIndex(number): 设置弹窗层的 z-index 值.
- autoIndex(boolear): 是否自动获取最大 z-index 值.
- getNode(boolear): 获取弹窗挂载的节点.
- extra: 额外传递的参数对象.
- isAsync(boolear): 是否为异步组件.

## 本地存储操作
定义了一个 store 函数,用于封装与indexedDB相关的操作,包括获取、更新、重置等。这里使用了indexedDB来记录弹窗的历史状态.IndexedDB是一种浏览器内置的非关系型数据库,存储空间更大(较新浏览器可达1GB),支持结构化数据存储

### 打开弹窗
show 函数用于打开弹窗,它执行以下操作:

将弹窗的 id 推入浏览器历史状态
将弹窗的 id 推入本地存储的历史记录
触发 onOpen 事件,通知外部弹窗已打开

### 关闭弹窗
hide 函数用于关闭弹窗,它根据用户的操作方式 (点击物理返回键或点击按钮) 执行不同的逻辑:

如果是点击物理返回键,则只需还原 isSynced 状态
如果是点击按钮,则触发 onClose 事件,从indexedDB和浏览器历史状态中删除相应的记录,并执行 history.back() 操作

### 关闭弹窗 (另一种方式)
closePopup 函数提供了另一种关闭弹窗的方式,它触发 update:visible 事件,通知外部组件改变 visible 的值。

### 获取最大 z-index
getMaxZIndex 函数用于获取页面中所有 DOM 元素的最大 z-index 值,以便为弹窗设置合适的 z-index。

### 返回到指定层级
backLvBy 函数用于通过条件返回到指定层级,它接受三个参数:
- targetLv: 目标层级
- totalLv: 总层级数
- callBack: 回调函数,在每个层级都会执行

### 监听 props 变化
使用 watch 函数监听 visible 和 isAsync 两个 prop 的变化:
   - 当 visible 变化时,调用 show 或 hide 函数,并添加或移除 popstate 事件监听器
   - 当 isAsync 变化时,如果为 false,则重置本地存储的历史记录
### 卸载时清理
在组件卸载时,使用 onUnmounted 钩子移除 popstate 事件监听器。

浏览器历史状态变化监听器
listener 函数是一个事件监听器,它监听浏览器历史状态的变化 (popstate 事件)。当用户点击物理返回键时,它会执行以下操作:

## 获取当前的浏览器历史状态 ID 和indexedDB的历史记录
如果当前的返回事件 ID 与最后一个弹窗 ID 匹配,则触发 onClose 事件,关闭弹窗,从indexedDB中删除相应记录,并将 isSynced 设置为 true
最后,usePopup 函数返回了一个对象,包含以下属性和方法:

- getMaxZIndex: 获取最大 z-index 的方法
- show: 打开弹窗的方法
- hide: 关闭弹窗的方法
- closePopup: 另一种关闭弹窗的方法
- backLvBy: 返回到指定层级的方法
- isSynced: 同步状态
- id: 弹窗的唯一标识符
