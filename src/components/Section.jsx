import React from "react"
import glamorous from "glamorous"
import { Container, Row, Col } from 'glamorous-grid'

export const Hr = glamorous.div({
    width: '100%',
    height: '10px',
    borderBottom: '1px solid'
}, ({ theme }) => ({
    borderColor: theme.color.primary
}));

const StyledContainer = glamorous(Container)({
    paddingTop: '3rem',
    paddingBottom: '3rem'
}, ({ theme }) => ({
    '& a': {
        textDecoration: 'none',
        color: theme.color.primary,
    },
    '& ul': {
        textAlign: 'start',
    }
}));

export const H1 = glamorous.h1({
    fontSize: '1.31951rem',
    textTransform: 'uppercase'
});

export const H2 = glamorous.h2({
    fontSize: '1.31951rem'
});

export const H3 = glamorous.h3({
    fontSize: '1rem'
});

export const H4 = glamorous.h4({
    fontSize: '0.87055rem'
});

export default ({ title, name, children, cssover }) => {
    const css2 = {
        paddingTop: '5rem',
        paddingBottom: '5rem',
        ...cssover
    };

    return (
        <div>
            <a name={name} id={name}></a>
            <StyledContainer>
                <Row>
                    <Col span={{ md: 8 / 12, lg: 6 / 12, xl: 4 / 12 }} offset={{ md: 2 / 12, lg: 3 / 12, xl: 4 / 12 }} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', ...cssover }}>
                        <H1 css={{textAlign: 'center', lineHeight: '2rem'}}>
                            {title}
                        </H1>
                        <Hr css={{height: '0px'}} />
                    </Col>
                </Row>
                {children}
            </StyledContainer>
        </div>
    )
}
