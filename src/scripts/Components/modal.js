const modal = (template='') => {
    return `
        <div class="overlay hide" id="overlay"></div>
        <div id="modal-content" class="modal-content hide">
            ${template}
        </div>
        </modal>
    `
}

export default modal