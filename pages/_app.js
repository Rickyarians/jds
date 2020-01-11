import '../public/assets/styles/utils.less'
import 'antd/dist/antd.css'
import getConfig from 'next/config'
import App from 'next/app'
import Head from 'next/head'
const { publicRuntimeConfig } = getConfig()

export default class CustomApp extends App {
  state = {
    forceRender: 0
  }

  static async getInitialProps({ ctx, router, Component }) {
    const props = {}


    return props
  }

  


  render() {
    const { Component, pageProps = {} } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>test - lotte</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <script src="/push-const.js"></script>
        </Head>

        {/* <ErrorBoundary> */}
        <Component {...pageProps} />
        {/* </ErrorBoundary> */}

     </React.Fragment>
    )
  }
}
