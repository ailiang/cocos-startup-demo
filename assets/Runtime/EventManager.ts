import Singleton from "../Base/Singleton";


interface FuncItem {
    func: Function;
    ctx: unknown
}
export default class EventManager extends Singleton{

    private evtDic : Map<string, Array<FuncItem>> = new Map();
    
    static get Instance(): EventManager {
        return super.GetInstance<EventManager>();
    }
    on(evtName: string, func : Function, ctx?: unknown) {
        if(!this.evtDic.has(evtName)) {
            this.evtDic.set(evtName, [{func, ctx}]);
        }else {
            this.evtDic.get(evtName).push({func, ctx});
        }
    }

    off (evtName: string, func : Function) {
        if(this.evtDic.has(evtName)) {
            const index = this.evtDic.get(evtName).findIndex(it=> it.func === func)
            index != -1 && this.evtDic.get(evtName).splice(index, 1);
        }
    }

    emit(evtName: string, ...args : unknown[]) {
        if(this.evtDic.has(evtName)) {
            this.evtDic.get(evtName).forEach(({func, ctx}) => {
                ctx? func.apply(ctx, args): func(...args) ;
            });
        }
    }

    clear() {
        this.evtDic.clear();
    }

    
} 