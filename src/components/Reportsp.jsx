import React from 'react'

const Reportsp = ({sp, obj, index, num, appsheet, smartinbound, remain_delivering, delivered, ttl_delivered}) => {

    console.log(obj)
  return (
        <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">{sp}</p>
            </td>
            <td className="p-4 border-b border-slate-200">
                {!obj[index][num].includes('remain_delivering')?'':parseInt(remain_delivering)>parseInt(ttl_delivered)?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                    <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                }
            </td>
            <td className="p-4 border-b border-slate-200">
                {!obj[index][num].includes('onhold')?'':parseInt(remain_delivering)>parseInt(delivered)?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                    <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                }
            </td>
            <td className="p-4 border-b border-slate-200">
                {!obj[index][num].includes('delivered_cnt')?'':parseInt(remain_delivering)>parseInt(delivered)?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                    <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                }
            </td>
            <td className="p-4 border-b border-slate-200">
                {!obj[index][num].includes('smart_inbound')?'':smartinbound!=1?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                    <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                }
            </td>
            <td className="p-4 border-b border-slate-200">
                {!obj[index][num].includes('Appsheet')?'':appsheet>0?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                    <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                }
            </td>
            <td className="p-4 border-b border-slate-200">
                {obj[index][num].includes('attendance')?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
            </td>
            <td className="p-4 border-b border-slate-200">
                {obj[index][num].includes('first_delivering_time')?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
            </td>
            <td className="p-4 border-b border-slate-200">
                {obj[index][num].includes('EPOD')?
                    <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
            </td>
        </tr>
  )
}

export default Reportsp