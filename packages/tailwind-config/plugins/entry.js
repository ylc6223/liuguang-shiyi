import plugin from 'tailwindcss/plugin'

// 进入动画工具类（v4 兼容）：.enter-x / .enter-y / .-enter-x / .-enter-y
// 参照 vben 内部实现，按 nth-child 生成阶梯延迟，默认 1..5
export const enterAnimationPlugin = plugin(function ({ addUtilities }) {
  const maxChild = 5
  const utilities = {}
  for (let i = 1; i <= maxChild; i++) {
    const baseDelay = 0.1
    const delay = `${baseDelay * i}s`

    utilities[`.enter-x:nth-child(${i})`] = {
      animation: `enter-x-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateX(50px)',
    }

    utilities[`.enter-y:nth-child(${i})`] = {
      animation: `enter-y-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateY(50px)',
    }

    utilities[`.-enter-x:nth-child(${i})`] = {
      animation: `enter-x-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateX(-50px)',
    }

    utilities[`.-enter-y:nth-child(${i})`] = {
      animation: `enter-y-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateY(-50px)',
    }
  }

  addUtilities(utilities)
  addUtilities({
    '@keyframes enter-x-animation': {
      to: {
        opacity: '1',
        transform: 'translateX(0)'
      },
    },
    '@keyframes enter-y-animation': {
      to: {
        opacity: '1',
        transform: 'translateY(0)'
      },
    },
  })
})

