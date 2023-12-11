import styled from "styled-components";

const Form = styled.form(() => {
    return {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '3px',
        overflow: 'hidden',
        input: {
            display: 'inline-block',
            width: '100%',
            font: 'inherit',
            fontSize: '20px',
            border: 'none',
            outline: 'none',
            paddingLeft: '4px',
            paddingRight: '4px',
        },
       'input::placeholder':{
            font: 'inherit',
            fontSize: '18px',
        },
        button: {
            position: 'relative',
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: 0,
            opacity: '0.6',
            transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            outline: 'none',
            span: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: 'inherit',
                height: 'inherit',
                padding: '8px',
                overflow: 'hidden',
                border: 0,
                svg: {
                    fill: '#3f51b5',
                }
            }
        },
        'button: hover': {
            opacity: '1',
        },
    }
});

export default Form;

