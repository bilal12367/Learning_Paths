
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import * as React from 'react';
//   import { SeasonStockNumberTableDataModel } from '../tableDataModel';
//   import KeywordFilter from './KeywordFilter';

export type Props = IFilterParams<{ make: string, model: string, price: number, electric: boolean }>;

const SELECT_ALL_LABEL = '(select all)';

export const customFilter = (_list: any[]) => {
    const list = Array.from(new Set<any>(_list)); // 重複排除

    // console.log('list1', _list);

    // eslint-disable-next-line react/display-name
    const SetFilter = React.forwardRef<Record<string, unknown>, Props>(
        (props, ref) => {
            const [_list, _setList] = React.useState<string[]>(list);
            const [checkedList, setCheckedList] = React.useState<string[]>(list);
            const [filteredList, setFilteredList] = React.useState<string[]>(list);

            React.useEffect(()=>{
                let set = new Set<string>();
                const filtered = list.filter((item: any) => {
                    if(!set.has(item.make)) {
                        set.add(item.make);
                        return true;
                    }
                    return false;
                })
                setFilteredList(filtered);
            },[])

            const getIsSomeSelected = () => {
                return checkedList.length > 0;
            };

            const getIsAllSelected = () => {
                if (filteredList.length !== _list.length) {
                    return filteredList.length === checkedList.length;
                }

                return _list.length === checkedList.length;
            };

            React.useEffect(() => {
                props.filterChangedCallback();
            }, [checkedList]);

            React.useImperativeHandle(ref, () => {
                return {
                    isFilterActive() {
                        return checkedList.length !== _list.length;
                    },

                    doesFilterPass(params: IDoesFilterPassParams) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const { api, colDef, column, columnApi, context, valueGetter } =
                            props;
                        const { node } = params;
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const value = (
                            valueGetter({
                                api,
                                colDef,
                                column,
                                columnApi,
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                context,
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                data: node.data,
                                getValue: (field) =>
                                    (node.data as Record<string, unknown>)[field],
                                node,
                            }) as Record<string, unknown>
                        )
                            ?.toString()
                            .toLowerCase();

                        return checkedList.some((entry) => entry === value);
                    },

                    onNewRowsLoaded() {
                        const stockNumberSet = new Set<string>();
                        const set = new Set<string>();
                        props.api.forEachLeafNode((node) => {
                            if (node.data && !set.has(node.data.make)) {
                                stockNumberSet.add(node.data as any);
                                set.add(node.data.make);
                            }
                        });
                        const newList = Array.from(stockNumberSet);
                        console.log('newList', newList)
                        _setList(newList);
                        setFilteredList(newList);
                        setCheckedList(newList);
                    },
                };
            });

            const handleToggle = (value: string) => () => {
                const currentIndex = checkedList.indexOf(value);
                const newChecked = [...checkedList];

                if (currentIndex === -1) {
                    newChecked.push(value);
                } else {
                    newChecked.splice(currentIndex, 1);
                }

                setCheckedList(newChecked);
            };

            const handleAllToggle = () => {
                const inversed = !getIsAllSelected();
                setCheckedList(inversed ? [...filteredList] : []);
            };



            const isAllSelected = getIsAllSelected();
            const isSomeSelected = getIsSomeSelected();

            const ListItem = (
                id: string,
                value: any,
                checked: boolean,
                handleClick: (entry?: unknown) => void,
                isIntermidiated = false
            ) => {
                // console.log(id == 'list-item-0' ? "List Item Render started: " + value.make as string : "List Item: " + value.make as string)
                return (
                    <p>{value.make}</p>
                )
            };
            // console.log('filtere', filteredList);
            return (
                <div>
                    {/* <KeywordFilter handleKeywordFilter={handleKeywordFilter} /> */}
{/* 
                    {ListItem(
                        'list-item-all',
                        SELECT_ALL_LABEL,
                        isAllSelected,
                        handleAllToggle,
                        !isAllSelected && isSomeSelected
                    )} */}
                    {filteredList.map((entry: any, index: number) => {
                        // console.log("Entry: ", entry)
                        return (
                            ListItem(
                                `list-item-${index}`,
                                entry,
                                checkedList.includes(entry),
                                handleToggle(entry)
                            )
                        )
                    }
                    )}

                </div>
            );
        }
    );
    return SetFilter;
}; 
