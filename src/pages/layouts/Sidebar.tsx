import { Icon } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LetsEatLogo from '../../components/logo/LetsEatLogo'
import {
   HighlightText,
   StandardCard,
} from '../../components/StyledComponents/common'
import routes from '../../routes'
import { _logout } from '../../state/firebaseActions/auth-actions'

export const SIDEBAR_WIDTH = 300
const SIDEBAR_MENU_BLOCK_MARGIN = 56

const SidebarCard = styled(StandardCard)`
   width: ${SIDEBAR_WIDTH}px;
   position: fixed;
   height: calc(100% - 6px);
   padding: 0;
   display: grid;
   grid-template-rows: auto 1fr auto;
`
const Logo = styled.div`
   margin-top: 72px;
   margin-bottom: 48px;
`
const UserProfileSection = styled.div`
   margin: 16px 40px;
   display: flex;
   gap: 16px;
   align-items: center;
   font-size: 1.2em;
   cursor: pointer;
`
const MenuGroup = styled.ul`
   margin-block: ${SIDEBAR_MENU_BLOCK_MARGIN}px;
   padding: 0;
   font-size: 1.2em;
   position: relative;
   &:after {
      content: ' ';
      width: 70%;
      border-bottom: 1px solid var(--color-text-muted);
      display: block;
      position: absolute;
      bottom: -${SIDEBAR_MENU_BLOCK_MARGIN / 2}px;
      opacity: 0.2;
      left: 50%;
      transform: translateX(-50%);
   }
   &:last-of-type:after {
      border-bottom: none;
   }
`
const MenuItem = styled.li<{ active?: boolean }>`
   margin: 4px;
   padding: 8px;
   padding-inline: 40px;
   list-style: none;
   display: flex;
   gap: 16px;
   align-items: center;
   border-radius: 4px;
   cursor: pointer;
   background-color: ${({ active }) =>
      active ? 'var(--color-text-highlight)' : 'transparent'};
   &:hover {
      color: ${({ active }) =>
         active ? 'inherit' : 'var(--color-text-highlight)'};
   }
   span {
      display: flex;
      align-items: center;
   }
`
const FooterMenu = styled(MenuGroup)`
   font-size: 1em;
`
const FooterMenuItem = styled(MenuItem)`
   &:hover {
      background-color: transparent;
   }
`

const Sidebar: React.FC = () => {
   const [menuGroups, setMenuGroups] = useState([])
   const accountUser = useSelector(
      ({ app: { currentLocalAuthUser } }: any) => currentLocalAuthUser
   )
   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      const groups = routes.reduce((accumulatedGroups, currentRoute) => {
         const currentGroupName = currentRoute.sidebarMenuGroup
         if (currentGroupName && typeof currentGroupName === 'string') {
            const currentGroupInAccumulator =
               accumulatedGroups[
                  currentGroupName as keyof typeof accumulatedGroups
               ] || []

            return {
               ...accumulatedGroups,
               [currentGroupName]: [...currentGroupInAccumulator, currentRoute],
            }
         }
         return accumulatedGroups
      }, {})
      setMenuGroups(Object.values(groups))
   }, [routes])

   const renderMenuGroup = (menuGroup: any) => {
      return (
         <MenuGroup>
            {menuGroup.map((menuItem: any) => (
               <MenuItem
                  active={location.pathname === menuItem.path}
                  onClick={() => navigate(menuItem.path)}
               >
                  <span>{menuItem.icon}</span>
                  <span>{menuItem.title}</span>
               </MenuItem>
            ))}
         </MenuGroup>
      )
   }

   return (
      <SidebarCard>
         <Logo>
            <LetsEatLogo />
         </Logo>
         <div>
            {accountUser ? (
               <UserProfileSection>
                  <Avatar name={accountUser.displayName} round size={'50'} />
                  <div>
                     {accountUser.displayName}
                     <HighlightText
                        style={{
                           fontStyle: 'italic',
                           display: 'flex',
                           alignItems: 'center',
                           fontSize: '0.75em',
                        }}
                     >
                        <Icon style={{ fontSize: '1em' }}>edit</Icon>
                        <span>Edit</span>
                     </HighlightText>
                  </div>
               </UserProfileSection>
            ) : null}

            {menuGroups.length > 0 && menuGroups.map(renderMenuGroup)}
         </div>
         <FooterMenu>
            <FooterMenuItem onClick={() => navigate('/preferences')}>
               <span>
                  <Icon>settings</Icon>
               </span>
               <span>Preferences</span>
            </FooterMenuItem>
            <FooterMenuItem onClick={_logout}>
               <span>
                  <Icon>logout</Icon>
               </span>
               <span>Logout</span>
            </FooterMenuItem>
         </FooterMenu>
      </SidebarCard>
   )
}

export default Sidebar
