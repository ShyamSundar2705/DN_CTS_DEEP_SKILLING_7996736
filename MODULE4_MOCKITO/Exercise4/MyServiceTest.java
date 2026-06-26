import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {

    @Test
    public void testVoidMethod() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        doNothing().when(mockApi).saveData();

        MyService service = new MyService(mockApi);

        service.storeData();

        verify(mockApi).saveData();
    }
}