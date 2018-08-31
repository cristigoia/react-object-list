import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import List from '../List'

jest.mock('../../utils/functions', () => ({
  getVisibleColumns: (a, b) => [...a, ...b],
  setColumnLabels: input => input,
}))
jest.mock('../Overlay', () => 'Overlay')

const props = {
  itemOnClick: jest.fn(),
  columns: [
    {
      dataKey: 'name',
      header: 'Name',
      item: ({row: {attributes: {name}}}) => name,
      optional: false,
      sortKey: '🎂',
    },
    [{
      dataKey: 'age',
      header: 'Age',
      item: ({row: {attributes: {age}}, key}) => (<span key={key}>{age}</span>),
      optional: false,
      sortKey: '🥧',
    },
    {
      dataKey: 'gender',
      header: 'Gender',
      item: ({row: {attributes: {gender}}}) => gender,
      optional: false,
      sortKey: '🍩',
    }],
  ],
  data: [
    {id: 1, type: 'Person', attributes: {name: 'Sam', age: '25', gender: 'M'}},
    {id: 2, type: 'Person', attributes: {name: 'Mary', age: '12', gender: 'F'}},
    {id: 3, type: 'Person', attributes: {name: 'Q', age: '3', gender: '?'}},
    {id: 4, type: 'Person', attributes: {name: 'Peter', age: '111', gender: 'FM'}},
    {id: 5, type: 'Person', attributes: {name: 'Amy', age: '32', gender: 'Confused'}},
  ],
}

describe('List', () => {
  describe('Functions', () => {
    it('handles clicking on row', () => {
      spyOn(props, 'itemOnClick')
      const row = {}
      const currentTarget = {}
      const target = {
        parentElement: currentTarget,
        tagName: 'TD',
      }
      const mockEvent = {
        currentTarget,
        target,
        persist: jasmine.createSpy(),
        preventDefault: jasmine.createSpy(),
        stopPropagation: jasmine.createSpy(),
      }
      const instance = shallow(
        <List
          {...props}
        />
      ).instance()
      instance.handleRowClick(mockEvent, row)
      expect(mockEvent.persist).toHaveBeenCalled()
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(mockEvent.stopPropagation).toHaveBeenCalled()
      expect(props.itemOnClick).toHaveBeenCalledWith(row)
    })
    it('handles clicking on a link in a row', () => {
      spyOn(props, 'itemOnClick')
      const row = {}
      const currentTarget = {}
      const target = {
        parentElement: currentTarget,
        tagName: 'A',
      }
      const mockEvent = {
        currentTarget,
        target,
        persist: jasmine.createSpy(),
        preventDefault: jasmine.createSpy(),
        stopPropagation: jasmine.createSpy(),
      }
      const instance = shallow(
        <List
          {...props}
        />
      ).instance()
      instance.handleRowClick(mockEvent, row)
      expect(mockEvent.persist).toHaveBeenCalled()
      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled()
      expect(props.itemOnClick).not.toHaveBeenCalled()
    })
  })
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        columns: [{dataKey: 'a'}, {dataKey: 'b'}],
        meta: {
          extraColumns: [{dataKey: 'c'}, {dataKey: 'd'}],
        },
      }
      const instance = shallow(<List />)
      instance.instance().setState({columns: []})
      instance.setProps(newProps)
      expect(instance.instance().state.columns).toEqual([...newProps.columns, ...newProps.meta.extraColumns])
    })
  })
  describe('Snapshots', () => {
    it('can click on items', () => {
      snapshotTest(<List {...props} itemOnClick={jest.fn()} />)
    })
  })
})
