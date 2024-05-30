import { useMemo } from 'react'
import styled from 'styled-components';
import { PaginationDataModel } from 'model/components/pagination/pagination'

interface PageButtonProps {
    isActive?: boolean;
}

export default function Pagination({ currentPage, totalPage, onChangePage }: PaginationDataModel) {
    // [val] max page
    const calMaxPage = Math.ceil(totalPage / 20)
    // [val] exception max page 
    const maxPage = calMaxPage === 0 ? 1 : calMaxPage
  
    // [func] Page calculate
    const pages = useMemo(() => {
      const start = Math.floor((currentPage - 1) / 10) * 10 + 1
  
      let end = start + 10 - 1
  
      if (end > maxPage) {
        end = maxPage
      }
  
      return Array(end - start + 1)
        .fill(start)
        .map((start, index) => start + index)
    }, [currentPage, 10, maxPage])
  
    // [func] Page moving button (Side <, >)
    function onClickSideButton(direction: 1 | -1) {
        if(direction === -1 && currentPage !== 1) onChangePage(currentPage + direction)
        else if(direction === 1 && currentPage !== maxPage) onChangePage(currentPage + direction)
    }
  
    // [func] Page moving button (Number)
    function onClickPage(page: number) {
        onChangePage(page)
    }    

    return (
        <>
            <PaginationContainer>
                <ButtonWrapper>
                    <PageButton type='button' onClick={() => onClickSideButton(-1)}>
                        &lt;
                    </PageButton>
                </ButtonWrapper>
                <PagesWrapper>
                    {pages.map((value, index) => {
                        return (
                            <PageButton 
                                key={value} 
                                type='button' 
                                onClick={() => onClickPage(value)} 
                                isActive={value === currentPage}
                            >
                                {value}
                            </PageButton>
                        )
                    })}
                </PagesWrapper>
                <ButtonWrapper>
                    <PageButton type='button' onClick={() => onClickSideButton(1)}>
                        &gt;
                    </PageButton>
                </ButtonWrapper>
            </PaginationContainer>        
        </>
    )
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const ButtonWrapper = styled.div`
    margin: 0 10px;
`;

const PagesWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

const PageButton = styled.button<PageButtonProps>`
    color: #000;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? '#0056b3' : 'transparent')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#004494' : '#e0e0e0')};
    }
`;
