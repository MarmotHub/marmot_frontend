import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://github.com/MarmotHub" target="_blank">GitHub</StyledLink>
      <StyledLink href="https://twitter.com/marmot_finance" target="_blank">Twitter</StyledLink>
      <StyledLink href="https://t.me/joinchat/Ub0Arx0t_n0wdMA4fPyitg" target="_blank">Telegram</StyledLink>
      <StyledLink href="https://marmotfinance.medium.com/" target="_blank">Medium</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[700]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[300]};
  }
`
export default Nav