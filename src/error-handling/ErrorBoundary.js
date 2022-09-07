import React from "react";

class ErrorBoundary1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            width: "20%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Something went wrong!</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary1;
