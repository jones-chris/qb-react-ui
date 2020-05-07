
class MetadataService {

    async getAvailableSchemas() {
        const response = fetch('http://localhost:8080/metadata/querybuilder4j/schema')
            .catch(error => console.log(error));

        return response.json();
    }

}

export default MetadataService;
