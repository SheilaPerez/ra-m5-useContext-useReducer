function tablePages(idx, state) {
    const from = state.currentPage === 1 ? 0 : state.currentPage * state.showMoreHouses - state.showMoreHouses
    const to = state.showMoreHouses * state.currentPage

    return idx >= from && idx < to
}


export default tablePages 

