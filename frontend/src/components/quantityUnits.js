function ServingQuantityAvailability(data) {
    if(data.product.serving_quantity) {

        return true;
    }
    else {
        return false;
    }

}

export default ServingQuantityAvailability;