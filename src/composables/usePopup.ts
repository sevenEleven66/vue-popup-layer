import { watch, onUnmounted, reactive } from 'vue'
import { getGuid } from '../utils'
import db from '../utils/indexedDBUtils'

interface PopupProps {
  visible: boolean
  animation: boolean
  zIndex: number
  autoIndex: boolean
  getNode: Function | string
  extra: object
  isAsync: boolean
}

interface PopupData {
  isSynced: boolean
  id: string
}

export const usePopup = (props: PopupProps, emit: (event: "onClose" | "update:visible" | "onOpen", ...args: any[]) => void) => {
  const data: PopupData = reactive({
    isSynced: false,
    id: 'popup-layer-' + getGuid(),
  })


  const store = (() => {
    const reset = () => {
      db.popups.clear()
    }

    const update = (newVal: string) => {
      db.popups.put({ id: newVal })
    }

    const getCur = () => {
      return db.popups.toArray()
    }

    const pop = () => {
      const popups: any = getCur()
      if (popups.length > 0) {
        db.popups.delete(popups[popups.length - 1].id)
      }
    }

    const push = (val: string) => {
      db.popups.put({ id: val })
    }

    return { reset, update, getCur, pop, push }
  })()

  const show = () => {
    window.history.pushState({ id: data.id }, '')
    store.push(data.id)
    emit('onOpen', data.id, props.extra)
  }

  const hide = () => {
    if (data.isSynced) return (data.isSynced = false)
    emit('onClose', { isPopstate: false }, props.extra)
    store.pop()
    history.back()
  }

  const closePopup = () => {
    emit('update:visible', false)
  }

  const getMaxZIndex = (() => {
    const body = document.body
    const allChildren = [...body.children] as HTMLElement[] // 获取 body 的所有直接子元素
    const getZIndex = (el: HTMLElement) => parseInt(window.getComputedStyle(el).zIndex) || 0

    return () => Math.max(0, ...allChildren.map(getZIndex))
  })()

  const backLvBy = (targetLv: number, totalLv: number, callback?: (arg0: any) => any) => {
    for (let i = targetLv + 1; i <= totalLv; i++) {
      setTimeout(() => {
        callback && callback(i)
      }, i * 30)
    }
  }

  const handlePopState = (event?: Event) => {
    const curState = history.state && history.state.id ? history.state.id : ''
    const historyState: any = store.getCur()
    const _len = historyState.length

    if (_len && curState !== historyState[_len - 1]) {
      if (historyState[_len - 1] === data.id) {
        emit('onClose', { isPopstate: true }, props.extra)
        closePopup()
        store.pop()
        data.isSynced = true
      }
    }
  }

  watch(
    () => props.visible,
    (val) => {
      val ? show() : hide()
      val
        ? window.addEventListener('popstate', handlePopState)
        : window.removeEventListener('popstate', handlePopState)
    }
  )

  watch(() => props.isAsync, (val) => {
    if (val) return
    const cache: any = store.getCur()
    const cacheLength = cache ? cache.length : 0
    cacheLength && history.go(-cacheLength)
    store.reset()
  })

  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState)
  })

  return {
    getMaxZIndex,
    show,
    hide,
    closePopup,
    backLvBy,
    isSynced: data.isSynced,
    id: data.id,
  }
}