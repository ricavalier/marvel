export const state = () => ({
  pub: process.env.ENV_PUB,
  priv: process.env.ENV_PRIV,
  timestamp: Math.floor(new Date())
})
