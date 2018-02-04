import React from "react"
import glamorous from "glamorous"
import { Container, Row, Col } from 'glamorous-grid'

const Hr = glamorous.div({
    width: '100%',
    height: '10px',
    borderBottom: '1px solid'
}, ({theme}) => ({
    borderColor: theme.color.primary
}));

export default ({title, name, children, cssover}) => {
    const css2 = {
        paddingTop: '5rem',
        paddingBottom: '5rem',
        ...cssover
    };
    console.log('CSS', css2)
    return (
        <div>
            <a name={ name } id={ name }></a>
            <Container css={ { paddingTop: '3rem', paddingBottom: '3rem' } }>
                <Row>
                    <Col span={ { md: 4 / 12 } } offset={ { md: 4 / 12 } } css={ { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', ...cssover } }>
                    <h3 css={ { textTransform: 'uppercase' } }>{ title }</h3>
                    <Hr/>
                    </Col>
                </Row>
                { children }
            </Container>
        </div>
    )
}
