import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {

    @Test
    public void testVoidMethodException() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        doThrow(new RuntimeException("Error"))
                .when(mockApi).saveData();

        MyService service = new MyService(mockApi);

        assertThrows(RuntimeException.class, () -> {
            service.storeData();
        });

        verify(mockApi).saveData();
    }
}