public class DependencyInjectionExample {

    public static void main(String[] args) {

        CustomerRepository repository =
                new CustomerRepositoryImpl();

        CustomerService service =
                new CustomerService(repository);

        Customer customer =
                service.findCustomerById("23IT001");

        System.out.println(
                "Customer Found: "
                + customer.getName()
                + " | ID: "
                + customer.getId());
    }
}

interface CustomerRepository {

    Customer findCustomerById(String id);
}

class CustomerRepositoryImpl
        implements CustomerRepository {

    @Override
    public Customer findCustomerById(String id) {

        return new Customer(
                id,
                "Shyam Sundar");
    }
}

class CustomerService {

    private CustomerRepository customerRepository;

    public CustomerService(
            CustomerRepository customerRepository) {

        this.customerRepository =
                customerRepository;
    }

    public Customer findCustomerById(
            String id) {

        return customerRepository
                .findCustomerById(id);
    }
}

class Customer {

    private String id;
    private String name;

    public Customer(
            String id,
            String name) {

        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}