import { Button } from 'antd'
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_TEXT_COLOR } from 'src/models/constants'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  margin: 1rem 0;
  padding: 0.8rem;
  height: auto;

  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
`

export const PrimaryButton = styled(StyledButton)`
  background: ${PRIMARY_BACKGROUND_COLOR};
  border: 1px solid ${PRIMARY_BACKGROUND_COLOR};
  color: #fff;

  :focus {
    background: ${PRIMARY_BACKGROUND_COLOR};
    border-color: ${PRIMARY_BACKGROUND_COLOR};
    color: #fff;
  }

  :active,
  :hover {
    background: #fff;
    border-color: ${PRIMARY_TEXT_COLOR};
    color: ${PRIMARY_TEXT_COLOR};
  }
`

export const SecondaryButton = styled(StyledButton)`
  background: white;
  border: 1px solid #2eccba;
  color: #2eccba;

  :focus {
    background: #fff;
    border-color: #2eccba;
    color: #2eccba;
  }

  :active,
  :hover {
    background: #2eccba;
    border-color: #2eccba;
    color: #fff;
  }
`
