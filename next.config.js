/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css')
// const withOffline = require('next-offline')

require("dotenv").config()

// config 
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
      config.module.rules.push({
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 1000000000
            }
        }
    });
    }
    return config
  },
  publicRuntimeConfig: {
    originHost: process.env.ORIGIN_HOST,
    graphQLUrl: process.env.GRAPHQL_URL,
    apiUrl: process.env.API_URL,
    wsUrl: process.env.SOCKET_URL,
    oneSignalAppId: process.env.ONESIGNAL_APPID,
  },
  devIndicators: {
    autoPrerender: false,
  },
  
}


// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './public/assets/antd-custom.less'), 'utf8')
)


module.exports = withPlugins([
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    }
  }],
  [withImages],
  [withCSS],
], nextConfig)