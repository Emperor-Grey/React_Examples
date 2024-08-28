import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from '../state/counter/counterSlice';
import { AppDispatch, RootState } from '../state/store';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex pt-28 flex-col items-center h-screen w-screen">
      <h1 className="text-4xl">{count}</h1>
      <hr />
      <div className="flex gap-4 pt-5">
        <button
          className="p-3 rounded-md hover:-translate-y-0.5 bg-blue-500 text-white"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="p-3 rounded-md hover:-translate-y-0.5 bg-red-500 text-white"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="p-3 rounded-md hover:-translate-y-0.5 bg-red-500 text-white"
          onClick={() => dispatch(decrementByAmount(10))}
        >
          -10
        </button>
        <button
          className="p-3 rounded-md hover:-translate-y-0.5 bg-blue-500 text-white"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          +10
        </button>
      </div>
    </div>
  );
};

export default Counter;
