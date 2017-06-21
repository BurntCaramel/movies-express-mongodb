import React from 'react'

function PersonRole({
    person,
    role
}) {
    return (
        <div>
            { person.firstName } { person.lastName }
            { ' — ' }
            { role }
        </div>
    )
}

export default function PeopleRolesList({
    items
}) {
    return (
        <div>
        {
            items.map(item => (
                <PersonRole key={ item._id }
                    { ...item }
                />
            ))
        }
        </div>
    )
}