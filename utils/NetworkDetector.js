import React, { Component } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedComponent) {
  // const dispatch = useDispatch()
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              // rel="preconnect"?
              
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          { isDisconnected && (
            <div className="bg-[#F97066] w-full text-[#FAFEFF] p-3 text-center items-center justify-center gap-4 absolute z-[40] top-0">
              <p className='text-sm font-semibold'>Internet connection lost, please check connection and try again </p>
            </div>)
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}