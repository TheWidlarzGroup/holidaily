type F0<RT = void> = () => RT
type F1<T, RT = void> = (arg: T) => RT
type F2<T1, T2, RT = void> = (a1: T1, a2: T2) => RT
type F3<T1, T2, T3, RT = void> = (a1: T1, a2: T2, a3: T3) => RT
