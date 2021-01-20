
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Typography, List, Button, Avatar, InputNumber, message } from 'antd';
import { useEffect, useState } from "react";
import {axiosGetScoreRule, axiosResetScore, axiosSetScore} from '../axios/axios';
import {reorderPriority} from '../util/util'
import { Redirect } from 'react-router-dom';
const { Title } = Typography;

const classes = {

    container: {
        maxHeight: '72vh',
        minHeight: '72vh',
        overflow: 'auto'
    },
    row: {
        overflow: 'auto'
    },
    column: {
        paddingLeft: '2em',
    },
    rule_div: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '4em',
        margin: '0 1em'
    },
    h3: {
        margin: '0.6em 1em'
    },
    droppable: {
        height: "100%",
    },
    list_footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 2em',
    },
    button: {
        margin: '0 1.5em'
    },
    description: {
        display: 'inline',
        alignItems: 'center',
    },
    description_fix: {
        margin: '0 5px'
    },
    ava: {
        backgroundColor: '#2db7f5',
        size: 'default'
    },
    tem: {
        size: 'default'
    }
}

const Rules = (props) => {
    const {className, description, param, priority, setParam, removeItem} = props;
    return (
        <List.Item>
        <List.Item.Meta 
            style={classes.rule_div}
            avatar={<Avatar style={classes.ava}>{priority}</Avatar>}
            title={
                <p>{className} </p>
            }
            description={
                description.postfix
                    ?   <div style={classes.description}>
                        <span style={classes.description_fix}>{description.prefix} </span>
                        <InputNumber 
                            size='small' 
                            min={1} 
                            onChange={setParam}
                            value={param}
                        />
                        <span style={classes.description_fix}>{description.postfix}</span>
                        </div>
                    :<span>{description.prefix}</span>
                
            }
        >
        </List.Item.Meta>
        <div><a onClick={removeItem}>Delete</a></div>
        </List.Item>
    );
};
const TemplateRule = (props) => {
    const {className, description} = props;
    return (
        <List.Item>
        <List.Item.Meta 
            style={classes.rule_div}
            avatar={<Avatar style={classes.tem}>T</Avatar>}
            title={
                <p>{className} </p>
            }
            description={
                description.postfix
                    ?   <div style={classes.description}>
                        <span style={classes.description_fix}>{description.prefix} </span>
                        <InputNumber 
                            size='small' 
                            disabled
                        />
                        <span style={classes.description_fix}>{description.postfix}</span>
                        </div>
                    :<span>{description.prefix}</span>
                
            }
        >
        </List.Item.Meta>
        </List.Item>
    );
};

const ScoreRule = ({isAuth}) => {
    const [rules, setRules] = useState(null);
    const [templates, setTemplates] = useState(null);
    const [isLoading, setLoading] = useState(false);

    // ============== initialize ====================
    const onViewScoreRule = async() => {
        const scoreRules = await axiosGetScoreRule();
        if (scoreRules) {
            setRules(scoreRules.myRules);
            setTemplates(scoreRules.templates);
        } 
    }
    // =============== manipulate rules ===============
    const setRuleParam = (index, newparam) => {
        let newrules = [...rules];
        newrules[index]  = {...newrules[index], param: newparam};
        setRules(newrules);
    }
    const remove = (index) => {
        const newrules = [...rules];
        newrules.splice(index, 1);
        setRules(reorderPriority(newrules));
    }
    // =============== reset and submit ===========
    const resetRules = async () => {
        const origin = await axiosResetScore();
        setRules(origin.myRules);
    }
    const submitRules = async () => {
        // submit rules
        setLoading(true);
        const result = await axiosSetScore(rules);
        setLoading(false);
        // console.log("result",result);
        if (result) {
            message.success("Update Score successfully", [1])
        } else {
            message.error("Score set fail",[1])
        }

    }
    
    useEffect(() => {
        onViewScoreRule();
    }, []);

    const onDragEnd = (result) => {
        // drag end move, reorder the state and update state
        const { source, destination } = result;
        // console.log(result);
        if (!destination) {
            return;
        }
        const newSelection = {
            rules: [...rules],
            templates: [...templates],
        };
        if (destination.droppableId !== source.droppableId) {
            if (source.droppableId === 'templates') {
                // add
                const newtemp = newSelection[source.droppableId][source.index];
                newSelection[destination.droppableId].splice(destination.index, 0, newtemp);
            } else {
                // delete 
                const [remove] = newSelection[source.droppableId].splice(source.index, 1);
            }
        } else {
            // change priority
            const [remove] = newSelection[source.droppableId].splice(source.index, 1);
            newSelection[destination.droppableId].splice(destination.index, 0, remove);
        } 
        const order = reorderPriority(newSelection.rules);
        setRules(order);
        setTemplates(newSelection.templates);

    };

    if (!isAuth) {
        return <Redirect to='/' />
    }
    return (
        <div>
        
        <List
            footer={
                <div style={classes.list_footer} >
                <Button key="reset" style={classes.button} onClick={resetRules}>
                  Reset
                </Button>
                <Button key="submit" type="primary"style={classes.button} onClick={submitRules} loading={isLoading}>
                  Submit
                </Button>
                </div>
              }
        >
            <DragDropContext onDragEnd={onDragEnd}>
            <Row>
                <Col span={12} 
                        style={classes.column}
                    >
                    <Title level={3} style={classes.h3}>
                        Rules
                    </Title>
                </Col>
                <Col span={12} 
                        style={classes.column}
                    >
                    <Title level={3} style={classes.h3}>
                        Templates
                    </Title>
                </Col>
            </Row>
            <Row style={classes.container}>
                <Col span={12} 
                // className={classes.selectionList}
                    style={classes.column}
                >
                <Droppable droppableId="rules">
                    {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={classes.droppable}
                    >
                        {rules
                        ? rules.map((rule,ind) => (
                            <Draggable
                                key={`rule_${ind}`}
                                draggableId={`rule_${ind}`}
                                index={ind}
                            >
                                 {(innerProvided) => (
                                <div
                                    ref={innerProvided.innerRef}
                                    {...innerProvided.draggableProps}
                                    {...innerProvided.dragHandleProps}
                                >
                                
                                        <Rules {...rule} 
                                            setParam={(p) => {
                                                // console.log(p);
                                                if (p && !isNaN(p)) {
                                                    setRuleParam(ind, p)
                                                }
                                            }}
                                            removeItem={()=>remove(ind)}
                                        />
                                    
                                    {innerProvided.placeholder}
                                </div>
                                )}
                            </Draggable>
                        ))
                        :null    }
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
                </Col>
                <br />
                <Col span={12} 
                    style={classes.column}
                    >
                <Droppable droppableId="templates">
                    {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={classes.droppable}
                    >
                        {templates
                        ? templates.map((content, ind) => (
                            <Draggable
                                key={`tem_${ind}`}
                                draggableId={`tem_${ind}`}
                                index={ind}
                            >
                                {(innerProvided) => (
                                <div
                                    ref={innerProvided.innerRef}
                                    {...innerProvided.draggableProps}
                                    {...innerProvided.dragHandleProps}
                                >
                                    <TemplateRule {...content} />
                                    {innerProvided.placeholder}
                                </div>
                                )}
                            </Draggable>
                            ))
                        : null}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
                </Col>
            </Row>
            </DragDropContext>
        </List>
        </div>
    );
};

export default ScoreRule;
