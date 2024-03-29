import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Trade</StyledLink>
      <StyledLink exact activeClassName="active" to="/liquidity">Liquidity</StyledLink>
      <StyledLink2 href="https://docs.marmot.exchange" target="_blank" >Docs</StyledLink2>
      {/*<StyledLink2 href="https://snapshot.page/#/basiscash.eth" target="_blank" >Vote</StyledLink2>*/}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.grey[100]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[300]};
  }
  &.active {
    color: ${props => props.theme.color.primary1};
  }
`
const StyledLink2 = styled.a`
  color: ${props => props.theme.color.grey[100]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[300]};
  }
  &.active {
    color: ${props => props.theme.color.primary1};
  }
`

export default Nav