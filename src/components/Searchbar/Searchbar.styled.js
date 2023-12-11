import styled from "styled-components";

const SearchbarStyled = styled.header(() => {
    return {
        top: 0,
        left: 0,
        position: 'sticky',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '34px',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '12px',
        paddingBottom: '12px',
        color: '#fff',
        backgroundColor: '#3f51b5',
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
}
}
)

export default SearchbarStyled;