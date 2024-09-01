import React from 'react';

const Loading = () => {
  const dotStyle = {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: '#1890ff',
    animation: 'bounce 1.5s infinite',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
  };

  const textStyle = {
    marginTop: '16px',
    fontSize: '18px',
    color: '#1890ff',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex' }}>
        <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
        <div style={{ ...dotStyle, animationDelay: '0.3s' }}></div>
        <div style={{ ...dotStyle, animationDelay: '0.6s' }}></div>
      </div>
      <div style={textStyle}>Loading</div>
    </div>
  );
};

// Inject the keyframe animation directly into the document's style
const bounceAnimation = `
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Adding the keyframe to the document's head
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(bounceAnimation, styleSheet.cssRules.length);

export default Loading;
