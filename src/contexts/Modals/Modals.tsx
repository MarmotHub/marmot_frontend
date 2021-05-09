import React, { createContext, useCallback, useState } from 'react'
import styled from 'styled-components'

interface ModalsContext {
  content?: React.ReactNode,
  isOpen?: boolean,
  onPresent: (content: React.ReactNode) => void,
  onDismiss: () => void
}



export const Context = createContext<ModalsContext>({
  onPresent: () => {},
  onDismiss: () => {},
})

const Modals: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()



  const handlePresent = useCallback((modalContent: React.ReactNode) => {
    setContent(modalContent)
    setIsOpen(true)
  }, [setContent, setIsOpen])

  const handleDismiss = useCallback(() => {
    setContent(undefined)
    setIsOpen(false)
  }, [setContent, setIsOpen])

  return (
    <Context.Provider value={{
      content:content,
      isOpen:isOpen,
      onPresent: handlePresent,
      onDismiss: handleDismiss,
    }}>
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) && React.cloneElement(content, {
            onDismiss: handleDismiss,
          })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  )
}

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 9999;
`

const StyledModalBackdrop = styled.div`
  background-color: #00000088;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default Modals