import { FunctionComponent } from 'react';

import useWindowSize from '@hooks/useWindowSize';
import Box from '@view/elements/Box';

const ResponsiveDemo: FunctionComponent = () => {
  const { width, height, isMobile } = useWindowSize();

  return (
    <Box padding='2rem'>
      <h2>Window Size Demo</h2>
      <Box
        display='flex'
        flexDirection='column'
        gap='1rem'
        padding='1rem'
        bgcolor={isMobile ? '#ffcccc' : '#ccffcc'}
        style={{
          borderRadius: '8px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <p>Current window width: {width}px</p>
        <p>Current window height: {height}px</p>
        <p>Is Mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p style={{ fontStyle: 'italic' }}>
          Resize your browser window to see values update. Background changes color based on mobile
          breakpoint (900px).
        </p>
      </Box>
    </Box>
  );
};

export default ResponsiveDemo;
