import { styled } from 'styled-components';

export const LoaderCont = styled('div')(() => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
});
